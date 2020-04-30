import React from 'react';
import { GridLayoutContext } from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List.Context';

const GridLayoutProviderMock = ({
  children,
  layout,
}: {
  children: React.ReactNode;
  layout: Layout;
}) => {
  const [gridLayout, setGridLayout] = React.useState(layout);

  function setGridLayoutAndSave(tile: string) {
    setGridLayout(tile as Layout);
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
