/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  FeatureFlagProvider,
  useIsFeatureActive,
  FeatureFlagged,
  useSetFeatureFlags,
  FlagType,
} from '../../components';

const featureList: FlagType[] = [
  {
    id: 'INACTIVE',
    active: false,
    title: 'Inactive features',
  },
  {
    id: 'ACTIVE',
    active: true,
    title: 'Active features',
  },
];

const TestComponent = () => {
  const isInactiveFlag = useIsFeatureActive('INACTIVE');
  const isActiveFlag = useIsFeatureActive('ACTIVE');
  return (
    <>
      {isInactiveFlag ? <div>I should not be shown</div> : null}
      {isActiveFlag ? <div>I am shown</div> : null}
      <FeatureFlagged feature='INACTIVE'>
        <div>I should not be shown using tag</div>
      </FeatureFlagged>
      <FeatureFlagged feature='ACTIVE'>
        <div>I am shown using tag</div>
      </FeatureFlagged>
    </>
  );
};
const TestComponentLoadLater = () => {
  const setFeatureFlags = useSetFeatureFlags();

  React.useEffect(() => {
    setFeatureFlags(featureList);
  }, []);
  return <TestComponent />;
};

describe('Feature Flag context', () => {
  describe('Features are set when context is created', () => {
    beforeEach(() => {
      render(
        <FeatureFlagProvider features={featureList}>
          <TestComponent />
        </FeatureFlagProvider>
      );
    });

    it('Item is hidden when useIsFeatureActive is called on an inactive feature', () => {
      expect(
        screen.queryByText('I should not be shown')
      ).not.toBeInTheDocument();
    });

    it('Item is shown when useIsFeatureActive is called on an active feature', () => {
      expect(screen.queryByText('I am shown')).toBeInTheDocument();
    });

    it('Item  wrapped in FeatureFlagged is hidden for an inactive feature', () => {
      expect(
        screen.queryByText('I should not be shown using tag')
      ).not.toBeInTheDocument();
    });

    it('Item  wrapped in FeatureFlagged is shown for an active feature', () => {
      expect(screen.queryByText('I am shown using tag')).toBeInTheDocument();
    });
  });

  describe('Features are loaded using useSetFeatureFlags', () => {
    beforeEach(() => {
      render(
        <FeatureFlagProvider>
          <TestComponentLoadLater />
        </FeatureFlagProvider>
      );
    });

    it('Item is hidden when useIsFeatureActive is called on an inactive feature', () => {
      expect(
        screen.queryByText('I should not be shown')
      ).not.toBeInTheDocument();
    });

    it('Item is shown when useIsFeatureActive is called on an active feature', () => {
      expect(screen.queryByText('I am shown')).toBeInTheDocument();
    });

    it('Item  wrapped in FeatureFlagged is hidden for an inactive feature', () => {
      expect(
        screen.queryByText('I should not be shown using tag')
      ).not.toBeInTheDocument();
    });

    it('Item  wrapped in FeatureFlagged is shown for an active feature', () => {
      expect(screen.queryByText('I am shown using tag')).toBeInTheDocument();
    });
  });
});
