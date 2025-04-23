import { Ticket } from "@/types";
import { Check, CheckFat } from "@phosphor-icons/react";

interface EventTicketsProps {
  tickets: Ticket[];
}

export default function EventTickets({ tickets }: EventTicketsProps) {
  return (
    <div className="w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {tickets.map((ticket, index) => (
        <div key={index} className="bg-color-primary rounded-lg p-6 shadow-md">
          <h2 className="text-color-text text-2xl font-bold mb-2">
            {ticket.type}
          </h2>
          <p className="text-color-text mb-4 text-sm">{ticket.description}</p>

          <div className="mb-6">
            <span className="text-color-text text-3xl font-bold">
              ₺{ticket.price}
            </span>
            <span className="text-color-text ml-1 text-sm">TRY</span>
          </div>

          <a
            href={ticket.link}
            className="block w-full text-center bg-color-background text-color-texxt py-4 px-4 rounded-lg border-2 border-color-accent hover:border-color-secondary hover:bg-color-secondary hover:text-color-background transition-all duration-300 mb-6 text-2xl"
          >
            Destek Olun
          </a>

          <div className="pt-4">
            {ticket.perks.map((perk, i) => (
              <div
                key={i}
                className="flex items-center border-t border-color-accent py-4 gap-x-4"
              >
                <Check size={20} />
                <span className="text-color-text">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
