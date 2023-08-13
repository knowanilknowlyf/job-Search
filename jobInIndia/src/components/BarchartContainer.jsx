import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const BarchartContainer = ({data}) => {
    return (
        <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{top:50}}>
            <CartesianGrid strokeDasharray='3 3'/>
            <XAxis dataKey='date'/>
            <YAxis allowDecimals='false'/>
            <Tooltip/>
            <Bar type='monotone' dataKey='count' stroke='#2d2d2d' fill='#fefefe'/>
        </BarChart>
    </ResponsiveContainer>
    );
}

export default BarchartContainer;
