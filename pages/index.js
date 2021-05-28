import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parse, parseISO, subDays } from 'date-fns';

const data = [];
for(let num = 30; num >=0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substring(0, 10),
    value: 1 + Math.random()
  })
}

export default function Home() {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={data}>
        <Area dataKey='value' />
        <XAxis dataKey='date' />
        <YAxis dataKey='value' />
        <Tooltip />
        <CartesianGrid />
      </AreaChart>
    </ResponsiveContainer>
  )
}
