import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment } from 'react';
import { BasketItem } from '../../app/models/basket';
import { Order } from '../../app/models/order';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
    const subTotal =
        order.orderItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        ) ?? 0;

    return (
        <Fragment>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} gutterBottom variant='h4'>
                    Order #{order.id} - {order.orderStatus}
                </Typography>
                <Button
                    onClick={() => setSelectedOrder(0)}
                    sx={{ m: 2 }}
                    size='medium'
                    variant='contained'
                >
                    Back to Orders
                </Button>
            </Box>
            <BasketTable
                items={order.orderItems as BasketItem[]}
                isBasket={false}
            />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary subtotal={subTotal} />
                </Grid>
            </Grid>
        </Fragment>
    );
}