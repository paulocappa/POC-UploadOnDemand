import { randomUUID, randomBytes } from 'crypto';

export default function generateFilename(): string {
  const hex = randomBytes(4).toString('hex');
  const uuid = randomUUID();

  return `${hex}-${uuid}`;
}
