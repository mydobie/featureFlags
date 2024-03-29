/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactElement } from 'react';
import {
  useEditFeatureFlag,
  useGetFeatures,
  useResetFeatureFlags,
  FFContext,
} from './index';
import NoFlags from './NoFlags';
import ReadOnly from './ReadOnly';

type CoreUIType = {
  onFeatureChange?: (id: string, checked: boolean) => void;
  onFeatureReset?: () => void;
  readonly?: boolean;
  notDefaultIndicator?: ReactElement;
};

const CoreUI = ({
  onFeatureChange = () => {},
  onFeatureReset = () => {},
  readonly = false,
  notDefaultIndicator = (
    <span
      className='badge badge-pill badge-info rounded-pill bg-info text-dark'
      data-testid='notDefaultIndicatorDefault'
    >
      Changed
    </span>
  ),
}: CoreUIType): ReactElement => {
  const features = useGetFeatures();
  const editFeature = useEditFeatureFlag();
  const resetFlags = useResetFeatureFlags();
  const { persist } = React.useContext(FFContext);
  if (!features || features.length === 0) {
    return <NoFlags />;
  }

  return readonly ? (
    <ReadOnly
      features={features || []}
      notDefaultIndicator={notDefaultIndicator}
    />
  ) : (
    <>
      <ul data-testid='coreFeatureFlagsUI'>
        {features.map((feature) => (
          <li key={feature.id}>
            <div className='form-check form-switch custom-control custom-switch'>
              <input
                className='form-check-input custom-control-input'
                type='checkbox'
                id={feature.id}
                checked={feature.active}
                onChange={(e) => {
                  editFeature(feature.id, e.target.checked);
                  onFeatureChange(feature.id, e.target.checked);
                }}
                disabled={readonly}
              />{' '}
              <label
                className='form-check-label custom-control-label font-weight-bold fw-bold'
                htmlFor={feature.id}
              >
                {feature.title ?? feature.id}
                {feature.active !== feature.original ? (
                  <span data-testid='flagNotInitialWarning'>
                    {' '}
                    {notDefaultIndicator}
                  </span>
                ) : null}
              </label>
              {feature.description ? (
                <div
                  className='text-muted font-italic fst-italic'
                  data-testid='feature_description'
                >
                  {feature.description}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      {persist && !readonly ? (
        <p
          className='alert alert-secondary'
          role='alert'
          data-testid='persistAlert'
        >
          <strong>NOTE:</strong> Feature flag values are persisting on page
          refresh. This is not recommended for a production environment. Check
          the <code>persist</code> setting when calling{' '}
          <code>FeatureFlagProvider</code>.
        </p>
      ) : null}
      {!readonly ? (
        <button
          type='button'
          className='btn btn-success'
          data-testid='resetButton'
          onClick={() => {
            resetFlags();
            onFeatureReset();
          }}
        >
          Reset flags to default
        </button>
      ) : null}
    </>
  );
};

export default CoreUI;
