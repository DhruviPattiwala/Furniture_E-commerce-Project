import {toast} from "sonner";
export async function fetchDashboardData() {
    try {

        const [usersRes, ordersRes] = await Promise.all([
            fetch('/api/users'),
            fetch('/api/order'),
           
        ]);
        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();

        const totalUsers = usersData.totalUsers;
        const totalOrders = ordersData.totalOrders;
        const totalSales = ordersData.totalSales[0].totalSales;
        const totalPending = ordersData.totalPending;

        return { totalUsers, totalOrders, totalSales, totalPending };

    } catch (error) {
        toast.error(`Error fetching data: ${(error as Error).message}`);
    }
}
