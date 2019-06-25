import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import createAdminRouter from '../router/createAdminRouter';
import ContentWrapper from '../../common/ContentWrapper';
import ContentWrapperBody from '../../common/ContentWrapperBody';
import SourceForm from './SourceForm';
import FormToolbar from '../../common/FormToolbar';

class Source extends Component {
  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    currentItem: PropTypes.string.isRequired,
    adminAction: PropTypes.shape({
      getSource: PropTypes.func,
      updateSource: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.agreeAction = this.agreeAction.bind(this);
    this.goToView = this.goToView.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { adminAction, currentItem } = this.props;
    if (prevProps.currentItem !== currentItem) {
      adminAction.getSource(currentItem);
    }
  }

  componentWillMount() {
    const { adminAction, currentItem } = this.props;
    adminAction.getSource(currentItem);
  }

  agreeAction() {
    const { adminAction, updatedSource } = this.props;
    console.log(updatedSource);
    adminAction.updateSource(updatedSource);
  }

  goToView() {
    const { history, selectedSourceName } = this.props;
    const rootPath = '/admin';
    history.push(`${rootPath}/view/${selectedSourceName}`);
  }

  static getInitialValues(selectedSourceData) {
    if (!selectedSourceData) {
      return {
        name: '',
        alias: '',
        metadata: {
          geometryType: '',
          idField: '',
          fields: []
        }
      }
    }
    return selectedSourceData
  }

  render() {
    const { selectedSourceData } = this.props;

    const initialValues = Source.getInitialValues(selectedSourceData);
    return (
      <ContentWrapper>
        <ContentWrapperBody>
          <FormToolbar nameTitle="Источник" openView={this.goToView}/>
          <SourceForm
            save={this.agreeAction}
            initialValues={initialValues}
          />
        </ContentWrapperBody>
      </ContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    updatedSource: getFormValues('source')(state),
    selectedSourceData: state.source.selectedSourceData,
    selectedSourceName: state.source.selectedSourceName,
  };
}

const SourceWithAdminRouter = createAdminRouter(Source);

export default connect(mapStateToProps)(SourceWithAdminRouter);