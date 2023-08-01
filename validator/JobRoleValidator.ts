import { JobRole } from '../model/JobRoleCorrect';

module.exports.validateJobRole = function(jobRole: JobRole): string | null {
    if (!jobRole.name) {
      return 'Job role name is required.';
    }

    if (!jobRole.specification) {
      return 'Job role specification is required.';
    }

    if (!jobRole.bandId) {
      return 'Job role band ID is required.';
    }

    if (!jobRole.capabilityId) {
      return 'Job role capability ID is required.';
    }

    return null
}
