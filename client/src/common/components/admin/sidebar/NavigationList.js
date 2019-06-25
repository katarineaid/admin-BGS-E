import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DomainList from '../../common/domainList/DomainList';
import DomainListItem from '../../common/domainList/DomainListItem';

const OverFlowDiv = styled.div`
overflow-y: auto;
`;

const NavigationList = ({
                          elements,
                          selectedName,
                          selectElement,
                          config,
                        }) => {
    const rootLevel = -1;

    const getElementsListItems = (elementsItems, level, config) => {
      const currentLevel = level + 1;
      return elementsItems.map((element) => {
        const { name, alias, url, children } = element;
        const src = url ? config.client + '/resources/' + url : null;
        const nested = children;
        const isFolder = children.length !== 0;
        const selected = (selectedName === name);
        return (<DomainListItem
          key={name}
          id={name}
          title={alias}
          url={src}
          level={currentLevel}
          isFolder={isFolder}
          selected={selected}
          onClick={selectElement}
          nested={getElementsListItems(nested, currentLevel, config)}
        />);
      });
    };

    return (
      <OverFlowDiv>
        <DomainList>
          {
            getElementsListItems(elements, rootLevel, config)
          }
        </DomainList>
      </OverFlowDiv>
    )
  }
;
NavigationList.propTypes = {
  elements: PropTypes.arrayOf(PropTypes
  .shape({ type: PropTypes.string, name: PropTypes.string, children: PropTypes.array })),
  selectedName: PropTypes.string,
  selectElement: PropTypes.func,
  actionsBar: PropTypes.node,
  config: PropTypes.objectOf(PropTypes.string).isRequired,
};


NavigationList.defaultProps = {
  elements: [],
  selectedName: '',
  selectElement: undefined,
  actionsBar: undefined,
};

export default NavigationList;