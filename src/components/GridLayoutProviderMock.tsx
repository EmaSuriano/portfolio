import React, { useState } from 'react';
import { GridLayoutContext } from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List.Context';

type Layout = 'tiles' | 'rows';

type Props = {
  children: React.ReactNode;
  layout: Layout;
};

const GridLayoutProviderMock = ({ children, layout }: Props) => {
  const [gridLayout, setGridLayout] = useState(layout);

  return (
    <GridLayoutContext.Provider
      value={{
        gridLayout: layout,
        hasSetGridLayout: true,
        setGridLayout: (tile) => setGridLayout(tile as Layout),
        getGridLayout: () => gridLayout,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
};

export default GridLayoutProviderMock;
