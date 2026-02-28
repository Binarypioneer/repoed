import { getCurrentUser } from "../../lib/getCurrentUser";
import { prisma } from "../../lib/prisma";

export default async function MessagesPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-2xl font-black">Messages</h1>
        <p className="mt-4 text-gray-500">Sign in to view your messages.</p>
      </div>
    );
  }

  const db = prisma as any;
  const messages = await db.message.findMany({ where: { OR: [{ senderId: user.id }, { receiverId: user.id }] }, include: { sender: true, receiver: true }, orderBy: { createdAt: 'desc' }, take: 20 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex gap-10">
        <aside className="hidden md:block w-72 shrink-0">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest">Messages</h3>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-gray-500 tracking-widest">My account</h4>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="border border-gray-100">
            <div className="flex w-full">
              <div className="w-1/2 py-6 text-center font-black uppercase tracking-widest border-b-4 border-black bg-white">Buy Messages</div>
              <div className="w-1/2 py-6 text-center font-black uppercase tracking-widest bg-gray-50 text-gray-400">Sell Messages</div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {messages.length === 0 ? (
              <div className="min-h-90 flex flex-col items-center justify-center text-center py-20">
                <p className="max-w-xl text-gray-600 leading-relaxed">Your conversations will appear here when you make an offer, ask a question, or purchase an item.</p>
              </div>
            ) : (
              messages.map((m: any) => (
                <div key={m.id} className="border p-4">
                  <div className="text-sm font-black">{m.senderId === user.id ? `To ${m.receiver?.username ?? m.receiver?.name}` : (m.sender?.username ?? m.sender?.name)}</div>
                  <div className="text-xs text-gray-600 mt-2">{m.body}</div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}