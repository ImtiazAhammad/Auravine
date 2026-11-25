import { MessageInbox } from '@/components/admin/MessageInbox';
import { adminGet } from '@/lib/admin/server';

export default async function MessagesPage() {
    const { items } = await adminGet<{ items: Record<string, unknown>[] }>('/messages', '/admin/messages');
    return <MessageInbox messages={items} />;
}
