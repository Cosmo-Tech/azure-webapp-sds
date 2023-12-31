// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { useCurrentScenario } from '../../state/hooks/ScenarioHooks';
import { useDatasetList } from '../../state/hooks/DatasetHooks';
import { useIsDarkTheme } from '../../state/hooks/ApplicationHooks';
import { useUserAppRoles } from '../../state/hooks/AuthHooks';
import { useSolution } from '../../state/hooks/SolutionHooks';
import { useUserPermissionsOnCurrentScenario } from '../../hooks/SecurityHooks.js';
import { useUpdateParameters } from '../../hooks/ScenarioParametersHooks.js';

export const useScenarioParameters = () => {
  const { runTemplateParametersIds, parametersMetadata } = useUpdateParameters();
  const datasetsData = useDatasetList().data;
  const currentScenario = useCurrentScenario();
  const solutionData = useSolution().data;
  const userRoles = useUserAppRoles();
  const userPermissionsOnCurrentScenario = useUserPermissionsOnCurrentScenario();
  const isDarkTheme = useIsDarkTheme();

  return {
    runTemplateParametersIds,
    parametersMetadata,
    datasetsData,
    currentScenario,
    solutionData,
    userRoles,
    userPermissionsOnCurrentScenario,
    isDarkTheme,
  };
};
