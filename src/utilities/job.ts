import { Merchi } from 'merchi_sdk_ts';

export function makeJob(
  jobJson: any, makeDirty?: boolean, arrayValueStrict?: boolean
) {
  const merchi = new Merchi();
  const job = new merchi.Job();

  return job.fromJson(
    jobJson,
    {makeDirty: !!makeDirty, arrayValueStrict: !!arrayValueStrict}
  );
}
