import React from 'react';
import { GridLayoutContext } from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List.Context';

const GridLayoutProviderMock = ({ children, layout }) => {
  const [gridLayout, setGridLayout] = React.useState(layout);

  function setGridLayoutAndSave(tile) {
    setGridLayout(tile);
  }

  return (
    <GridLayoutContext.Provider
      value={{
        gridLayout: layout,
        hasSetGridLayout: true,
        setGridLayout: setGridLayoutAndSave,
        getGridLayout: () => gridLayout,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
};

export default GridLayoutProviderMock;
