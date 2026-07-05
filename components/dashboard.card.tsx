type DashboardCardProps = {
    title: string;
    value: number;
}

export default function DashboardCard({
    title,
    value
}: DashboardCardProps){

    return(
        <div className="rounded-lg border p-6 shadow">
            <h3 className="text-black">{title}</h3>
            <p className="text-3xl font-bold text-black">{value}</p>
        </div>
    )
}