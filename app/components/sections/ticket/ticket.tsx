import { useMemo, useState } from "react";
import type { TicketsResponseType, TicketType } from "~/api/schema/ticket";
import { TicketBuyForm } from "~/components/shared/ticket-card/ticket-buy-form";
import { TicketCard } from "~/components/shared/ticket-card/ticket-card";

const nestArray = <T,>(arr: T[], size: number): T[][] => {
	const result: T[][] = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}
	return result;
};

export const Ticket = ({ tickets }: { tickets: TicketsResponseType }) => {
	const [ticketState] = useState<TicketType[]>(tickets.results);
	const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
	const nestedTickets = useMemo(() => nestArray(ticketState, 2), [ticketState]);

	const onSelectTicket = (id: string) => {
		setSelectedTicket(ticketState.find((ticket) => ticket.id === id) || null);
	};

	return (
		<main className="w-full mx-auto text-center">
			<h1 className="text-[#224083] text-3xl font-bold pb-10">
				Buy PyCon ID 2025 Ticket
			</h1>
			<div className="max-w-[1100px] mx-auto flex flex-col items-center gap-4">
				{nestedTickets.map((ticketRow) => (
					<div
						key={ticketRow[0].id}
						className="flex flex-col lg:flex-row gap-4 justify-center"
					>
						{ticketRow.map((ticket) => (
							<TicketCard
								key={ticket.id}
								id={ticket.id}
								name={ticket.name}
								price={ticket.price}
								description={ticket.description}
								isSelected={ticket.id === selectedTicket?.id}
								onClick={onSelectTicket}
							/>
						))}
					</div>
				))}
			</div>
			<TicketBuyForm selectedTicket={selectedTicket} />
		</main>
	);
};
