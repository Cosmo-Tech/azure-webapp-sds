// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import ScenarioDashboardCard from '.';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { customRender } from '../../../../../tests/utils/renderInThemeAndStoreProviders';
import { AccordionTesting, ButtonTesting } from '../../../../../tests/MuiComponentsTesting';
import { useScenarioDashboardCard } from './ScenarioDashboardCardHook';

beforeEach(() => {
  jest.resetModules();
});

jest.mock('../index', () => ({
  __esModule: true,
  ScenarioPowerBiReport: () => {
    return <div data-testid="scenario-powerbi-report" />;
  },
}));

jest.mock('./ScenarioDashboardCardHook', () => ({
  useScenarioDashboardCard: jest.fn(),
}));

const mockDownloadCurrentScenarioRunLogs = jest.fn();
const setScenarioDashboardCardHook = (customState = {}) => {
  useScenarioDashboardCard.mockReturnValue({
    hasRunBeenSuccessful: false,
    downloadCurrentScenarioRunLogs: mockDownloadCurrentScenarioRunLogs,
    ...customState,
  });
};

const Accordion = new AccordionTesting({ dataCy: 'dashboards-accordion' });
const LogsDownloadButton = new ButtonTesting({ dataCy: 'successful-run-logs-download-button' });
const getDashboard = () => screen.getByTestId('scenario-powerbi-report');

describe('test Scenario dashboard accordion', () => {
  it('unfolds and folds scenario dashboard card', async () => {
    setScenarioDashboardCardHook();
    customRender(<ScenarioDashboardCard />);
    expect(Accordion.Container).toBeVisible();
    expect(Accordion.ToggleButton).toBeVisible();
    expect(getDashboard()).not.toBeVisible();
    fireEvent.click(Accordion.ToggleButton);
    expect(getDashboard()).toBeVisible();
    fireEvent.click(Accordion.ToggleButton);
    await waitFor(() => expect(getDashboard()).not.toBeVisible());
  });
});

describe('display the logs download button only when necessary', () => {
  it('is hidden when the scenario run has failed or has never been launched', () => {
    setScenarioDashboardCardHook({ hasRunBeenSuccessful: false });
    customRender(<ScenarioDashboardCard />);
    expect(LogsDownloadButton.Button).toBeNull();
  });

  it('is visible when the scenario run has been successful', async () => {
    setScenarioDashboardCardHook({ hasRunBeenSuccessful: true });
    customRender(<ScenarioDashboardCard />);
    expect(LogsDownloadButton.Button).toBeVisible();
    LogsDownloadButton.click();
    expect(mockDownloadCurrentScenarioRunLogs).toHaveBeenCalled();
  });
});
