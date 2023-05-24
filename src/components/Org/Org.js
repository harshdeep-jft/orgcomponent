import React, { useState, useEffect } from "react";
import { OrgDiagram } from "basicprimitivesreact";
import {
  PageFitMode,
  Enabled,
  VerticalAlignmentType,
  HorizontalAlignmentType,
  ChildrenPlacementType,
  SelectionPathMode,
  Visibility
} from "basicprimitives";

import NodeCard from "../NodeCards/NodeCard";

function Org({ customersData }) {
  const [cursorItem, setCursorItem] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const { innerWidth: width, innerHeight: height } = window;
  const cardID = $('#entity').data('id');

  useEffect(() => {
    if (cardID) {
      setSelectedCard(cardID);
    }
  }, [])

  return (
    <div>
      <div hidden id={`length-${customersData.length}`} className="dataLength" />
      <OrgDiagram
        centerOnCursor={true}
        config={{
          customersData,
          cursorItem,
          pageFitMode: PageFitMode.AutoSize,

          selectionPathMode: SelectionPathMode.None,
          selectedItems: [3],
          minimalVisibility: Visibility.Dot,
          minimumVisibleLevels: 1,

          autoSizeMinimum: { width: 1024, height: 768 },
          autoSizeMaximum: { width: width, height: height },
          verticalAlignment: VerticalAlignmentType.Middle,
          horizontalAlignment: HorizontalAlignmentType.Left,
          childrenPlacementType: ChildrenPlacementType.Vertical,
          leavesPlacementType: ChildrenPlacementType.Horizontal,
          navigationMode: Enabled.False,
          hasSelectorCheckbox: Enabled.False,
          hasButtons: Enabled.False,
          buttonsPanelSize: 40,
          defaultTemplateName: "info",

          normalLevelShift: 20,
          dotLevelShift: 10,
          lineLevelShift: 10,
          normalItemsInterval: 20,

          templates: [{
            name: "info",
            itemSize: { width: 150, height: 100 },
            highlightBorderWidth: 2,
            highlightPadding: { left: 4, top: 4, right: 4, bottom: 4 },
            cursorPadding: { left: 3, top: 3, right: 3, bottom: 3 },
            cursorBorderWidth: 2,

            onItemRender: ({ context: itemConfig }) => {
              const hasChildren = customersData.filter(item => item.parent === itemConfig.id).length > 0;
              const isLeafNode = !hasChildren;
              $('#entity').data('length', `${customersData.length}`)
              return (
                <div
                  className={`InfoTemplate ${hasChildren ? '' : 'clickable'} `}
                  data-entity={itemConfig.id}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (isLeafNode) {
                      console.log('🚀  ~ value: ,', itemConfig.id, ':', itemConfig.description)
                      setSelectedCard(itemConfig.id);
                      $('#entity').data('id', `${itemConfig.id}`)
                      $('#entity').data('value', `${itemConfig.description}`)
                    }
                  }}
                >
                  <NodeCard
                    title={itemConfig.title}
                    description={itemConfig.description}
                    data={customersData}
                    itemConfig={itemConfig}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard} />
                </div>
              );
            }

          }],

          items: customersData.map((item) => ({
            id: item.id,
            parent: item.parent,
            title: item.title,
            description: item.description,
          })),
        }} scale={1} />
    </div>
  );
}

export default Org;