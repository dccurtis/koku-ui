import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { createMapStateToProps } from 'store/common';
import { onboardingActions, onboardingSelectors } from 'store/onboarding';
import { sourcesActions } from 'store/sourceSettings';
import { WizardBase } from './wizard';

export default connect(
  createMapStateToProps(state => ({
    isModalOpen: onboardingSelectors.selectOnboardingModal(state),
    isInvalid: onboardingSelectors.selectOnboardingIsInvalid(state),
    dirtyMap: onboardingSelectors.selectOnboardingDirty(state),
    sourceKindChecked: onboardingSelectors.selectOnboardingSourceKindChecked(
      state
    ),
    type: onboardingSelectors.selectOnboardingType(state),
    name: onboardingSelectors.selectOnboardingName(state),
    bucket: onboardingSelectors.selectOnboardingS3BucketName(state),
    clusterId: onboardingSelectors.selectOnboardingClusterID(state),
    arn: onboardingSelectors.selectOnboardingArn(state),
    status: onboardingSelectors.selectApiStatus(state),
    errors: onboardingSelectors.selectApiErrors(state),
  })),
  {
    cancelOnboarding: onboardingActions.cancelOnboarding,
    updateSources: sourcesActions.fetchSources,
    addSource: onboardingActions.addSource,
  }
)(translate()(WizardBase));
