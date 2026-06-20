import {Card,CardContent, Typography} from '@mui/material';
function summarycard({title,amount}){
    return(
        <>
        <Card  sx={{borderRadius: 3, boxShadow: 2,}}>
            <CardContent>
               <Typography color="text.secondary">{title}</Typography>
               <Typography variant="h6" fontWeight={700}> ${amount}</Typography>
            </CardContent>
        </Card>     
        
        </>
    )
}
export default summarycard;