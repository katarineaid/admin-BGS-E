import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/List';
import Close from '@material-ui/icons/Add';
import Open from '@material-ui/icons/Remove';

import { lightSecondColor, mainColor, secondColor, white } from '../../../constants/colors';

import DomainCollapseListItem from './DomainCollapseListItem';

const ListItemBody = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color}
`;
const FirstRow = styled.div`
  display: flex;
  justify-content:center;
  flex-grow: 1;
  padding: 8px 0px;
  align-items: center;
`;
const SecondIcon = styled.div`
  display: flex;
  height:20px;
  width:20px;
`;

const MainBar = styled.div`
   display: flex;
   flex-grow: 1;
   align-items: center;
   overflow: hidden;
`;

const Title = styled.div`
  font-weight: ${props => (props.isFolder ? 'bold' : 'normal')}
  font-size: 14px;
  margin: 0 8px;
  text-align: center;
  color: ${props => props.color}
`;
const Icon = styled.div`
 min-height: 24px;
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
`;


const StyledImg = styled.img`
 width:20px
`;


const style = (theme) => ({
  darkColor: {
    color: theme.palette.secondary.main
  },
  lightColor: { color: theme.palette.primary.main },
  backgroundColor: { color: theme.palette.primary.secondary },
});

class DomainListItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isFolder: PropTypes.bool.isRequired,
    icon: PropTypes.func,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    onCheck: PropTypes.func,
    checked: PropTypes.bool,
    actionBar: PropTypes.node,
    level: PropTypes.number,
    nested: PropTypes.arrayOf(PropTypes.node),
  }

  static defaultProps = {
    selected: false,
    onClick: undefined,
    onCheck: undefined,
    checked: false,
    actionBar: undefined,
    level: 0,
    icon: undefined,
    nested: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };

    this.onToggleItem = this.onToggleItem.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
    this.onCheckItem = this.onCheckItem.bind(this);
    this.getFolderIcon = this.getFolderIcon.bind(this);
    this.returnListItem = this.returnListItem.bind(this);
    this.getSecondIcon = this.getSecondIcon.bind(this);
  }


  onToggleItem() {
    this.setState(state => ({ open: !state.open }));
  }

  onClickItem() {
    const { onClick } = this.props;
    const { id } = this.props;
    if (onClick) {
      onClick(id);
    }
  }

  onCheckItem(event, isChecked) {
    const { onCheck } = this.props;
    const { id } = this.props;
    if (onCheck) {
      onCheck(id, isChecked);
    }
  }

  getFolderIcon() {
    const { isFolder, selected, icon } = this.props;
    const { open } = this.state;

    const IconComponent = icon;

    const color = selected ? style.darkColor : style.lightColor;

    //if (!isFolder) return <IconComponent color={color}/>;
    if (!isFolder) return undefined;

    return open ?
      <Open classes={color} onClick={this.onToggleItem}/> :
      <Close classes={color} onClick={this.onToggleItem}/>;
  }

  getSecondIcon() {
    const { url } = this.props;
    if (url) {
      return <StyledImg src={url} onClick={this.onClickItem}/>
    } else {
      return undefined
    }
  }

  returnListItem() {
    const { open } = this.state;
    const {
      title,
      id,
      level,
      isFolder,
      selected,
      nested,
      actionBar,
      classes,
    } = this.props;
    const icon = this.getFolderIcon();
    const secondIcon = this.getSecondIcon();
    const titleColor = selected ? secondColor : mainColor;
    const backgroundColor = selected ? lightSecondColor : white;

    //todo переделать на Styled-Component
    const nestedStyle = {
      paddingLeft: `${20 * level}px`
    };

    return (<ListItem
      key={id}
      id={id}
      open={open}
      disabled
      level={level}
      style={{
        ...nestedStyle
      }}
    >
      <ListItemBody color={backgroundColor}>
        <FirstRow>
          <MainBar>
            <Icon>
              {icon}
            </Icon>
            <SecondIcon
              style={{
                ...nestedStyle
              }}>
              {secondIcon}
            </SecondIcon>
            <Title
              isFolder={isFolder}
              color={titleColor}
              onClick={this.onClickItem}
            >
              {title}
            </Title>
          </MainBar>
          <ActionBar>
            {actionBar}
          </ActionBar>
        </FirstRow>
      </ListItemBody>
    </ListItem>)
  }

  render() {
    const { open } = this.state;
    const {
      id,
      isFolder,
      nested,
    } = this.props;

    if (isFolder) {
      return [
        this.returnListItem(),
        <DomainCollapseListItem key={id + "collapse"} open={open}>
          {nested}
        </DomainCollapseListItem>]

    } else {
      return this.returnListItem();
    }
  }
}


export default withStyles(style)(DomainListItem);
