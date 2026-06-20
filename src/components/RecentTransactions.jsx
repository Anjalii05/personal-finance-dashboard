import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper} from "@mui/material";
function RecentTransactions() {

    const transactions = [
        { category: "Food", amount: "$500", date: "Today" },
        { category: "Rent", amount: "$1500", date: "Yesterday" },
        { category: "Salary", amount: "$5000", date: "18 June 2026" },
        { category: "Travel", amount: "$2000", date: "15 June 2026" },
        ]
  return (
    <>
     <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table> 
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell> 
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}
export default RecentTransactions;