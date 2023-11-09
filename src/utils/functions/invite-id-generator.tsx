import { v4 as uuidv4 } from 'uuid';

export function generateInviteId(): string {
  const uuid = uuidv4();
  const inviteId = uuid.substring(0, 6);
  return inviteId;
}