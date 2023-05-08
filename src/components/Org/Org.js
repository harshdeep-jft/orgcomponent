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

function convertJsonToItemData(data) {
  let itemDataArray = [];

  function appendJsonData(data, parent) {

    let item = {};
    item.id = `${data.organizationID}_${parent}`;
    item.title = data.organizationCategory;
    item.description = data.organizationName;
    item.parent = parent;

    itemDataArray.push(item);

    if (data.children != null && data.children.length > 0) {
      for (let i = 0; i < data.children.length; i++) {
        let child = appendJsonData(data.children[i], item.id);
        itemDataArray.push(child);
      }
      // item.templateName = 'DisableTemplate'
    } else {
      if (itemDataArray.length > 6) {
        item.isVisible = false;
      }
    }

    return item;
  }

  appendJsonData(data, null);


  return itemDataArray;
}
function Org() {

  const [customersData, setcustomersData] = useState([]);
  const [cursorItem, setCursorItem] = useState(0);
  const [index, setIndex] = useState(customersData.length);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then(response => response.json())
      .then(data => {
        let result = convertJsonToItemData(data);
        setcustomersData(result)
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  console.log('🚀  file:  ,Line: ,method: , ~ value: ,', customersData)

  return (
    <div>
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
          autoSizeMaximum: { width: 1920, height: 1080 },
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

              return (
                <div
                  className={`InfoTemplate ${hasChildren ? '' : 'clickable'} `}
                  data-entity={itemConfig.id}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (isLeafNode) {
                      console.log('🚀  ~ value: ,', itemConfig.id, ':', itemConfig.description)
                      // $('#entity').data('id', `${itemConfig.id}`)
                      // $('#entity').data('value', `${itemConfig.description}`)
                    }
                  }}
                >
                  <NodeCard
                    title={itemConfig.title}
                    description={itemConfig.description}
                    data={customersData}
                    itemConfig={itemConfig} />
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