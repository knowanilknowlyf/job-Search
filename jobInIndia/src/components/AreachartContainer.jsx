import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AreachartContainer = ({data}) => {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <AreaChart data={data} margin={{top:50}}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='date'/>
                <YAxis allowDecimals='false'/>
                <Tooltip/>
                <Area type='monotone' dataKey='count' stroke='#2d2d2d' fill='#fefefe'/>
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default AreachartContainer;
