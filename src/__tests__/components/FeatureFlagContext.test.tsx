/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  FeatureFlagProvider,
  useIsFeatureActive,
  FeatureFlagged,
  useSetFeatureFlags,
  FlagType,
  featuresWithOverrides,
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
      <FeatureFlagged feature='INACTIVE' isNotActive>
        <div>I am showing an inactive feature</div>
      </FeatureFlagged>

      <FeatureFlagged feature='ACTIVE'>
        <div>I am shown using tag</div>
      </FeatureFlagged>
      <FeatureFlagged feature='ACTIVE' isNotActive>
        <div>I am hiding an active feature</div>
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

    it('Item wrapped in FeatureFlagged with isNotActive prop is shown for an inactive feature ', () => {
      expect(
        screen.getByText('I am showing an inactive feature')
      ).toBeInTheDocument();
    });

    it('Item wrapped in FeatureFlagged with isNotActive prop is hidden for an active feature ', () => {
      expect(
        screen.queryByText('I am hiding an active feature')
      ).not.toBeInTheDocument();
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

    it('Item wrapped in FeatureFlagged with isNotActive prop is shown for an inactive feature ', () => {
      expect(
        screen.getByText('I am showing an inactive feature')
      ).toBeInTheDocument();
    });

    it('Item wrapped in FeatureFlagged with isNotActive prop is hidden for an active feature ', () => {
      expect(
        screen.queryByText('I am hiding an active feature')
      ).not.toBeInTheDocument();
    });
  });

  describe('featuresWithOverrides', () => {
    // const features: FlagType[] = [
    //   { id: 'Feature1', active: false, original: true },
    //   {
    //     id: 'Feature2',
    //     active: true,
    //     original: true,
    //     title: 'my title feature 2',
    //     description: 'my description, feature 3',
    //   },
    // ];
    it('Overrides active', () => {
      const features = [
        { id: 'Feature1', active: false, original: true },
        { id: 'Feature2', active: false, original: true },
      ];
      const overRides = [{ id: 'Feature1', active: true }];

      const expected = [
        { id: 'Feature1', active: true, original: true },
        { id: 'Feature2', active: false, original: true },
      ];

      expect(featuresWithOverrides(features, overRides)).toEqual(expected);
    });

    it('Overrides title', () => {
      const features = [
        { id: 'Feature1', active: false, original: true, title: 'myOldTitle' },
        { id: 'Feature2', active: false, original: true },
      ];
      const overRides = [{ id: 'Feature1', title: 'my New title' }];

      const expected = [
        {
          id: 'Feature1',
          active: false,
          original: true,
          title: 'my New title',
        },
        { id: 'Feature2', active: false, original: true },
      ];

      expect(featuresWithOverrides(features, overRides)).toEqual(expected);
    });

    it('Overrides description', () => {
      const features = [
        {
          id: 'Feature1',
          active: false,
          original: true,
          title: 'myTitle',
          description: 'myOldDescription',
        },
        { id: 'Feature2', active: false, original: true },
      ];
      const overRides = [{ id: 'Feature1', description: 'my New description' }];

      const expected = [
        {
          id: 'Feature1',
          active: false,
          original: true,
          title: 'myTitle',
          description: 'my New description',
        },
        { id: 'Feature2', active: false, original: true },
      ];

      expect(featuresWithOverrides(features, overRides)).toEqual(expected);
    });

    it('Does not change features when overrides contains a flag not in features', () => {
      const features = [
        {
          id: 'Feature1',
          active: false,
          original: true,
          title: 'myTitle',
          description: 'myOldDescription',
        },
        { id: 'Feature2', active: false, original: true },
      ];
      const overRides = [
        { id: 'FeatureNOT', description: 'my New description' },
      ];

      expect(featuresWithOverrides(features, overRides)).toEqual(features);
    });

    it('Sets feature original if not set', () => {
      const features = [
        { id: 'Feature1', active: false, title: 'myOldTitle' },
        { id: 'Feature2', active: false },
      ];
      const overRides = [{ id: 'Feature1', active: true }];

      const expected = [
        { id: 'Feature1', active: true, original: false, title: 'myOldTitle' },
        { id: 'Feature2', active: false },
      ];

      expect(featuresWithOverrides(features, overRides)).toEqual(expected);
    });

    it('Returns features when overrides is undefined', () => {
      const features = [
        { id: 'Feature1', active: false, title: 'myOldTitle' },
        { id: 'Feature2', active: false },
      ];
      const overRides = undefined;

      expect(featuresWithOverrides(features, overRides)).toEqual(features);
    });

    it('Returns features when overrides is empty', () => {
      const features = [
        { id: 'Feature1', active: false, title: 'myOldTitle' },
        { id: 'Feature2', active: false },
      ];

      expect(featuresWithOverrides(features, [])).toEqual(features);
    });

    it('Returns [] if features are undefined', () => {
      const overRides = [{ id: 'Feature1', active: true }];

      expect(featuresWithOverrides(undefined, overRides)).toEqual([]);
    });

    it('Returns [] if features are empty', () => {
      const overRides = [{ id: 'Feature1', active: true }];

      expect(featuresWithOverrides([], overRides)).toEqual([]);
    });
  });
});
