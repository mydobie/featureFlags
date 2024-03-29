/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import React from 'react';

export const useGetVersions = (): [{ [key: string]: string }, () => void] => {
  const [versions, setVersions] = React.useState({});

  const loadVersions = () => {
    fetch('/featureFlags/versions.json')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setVersions(data);
        } else {
          throw Error('No version data');
        }
      })
      .catch(() => console.error('Error finding versions file'));
  };

  return [versions, loadVersions];
};
