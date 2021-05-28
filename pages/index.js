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
    value: 1 + Math.random(),
    value2: 1 - Math.random()
  })
}

export default function Home() {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#2451b7' stopOpacity={0.4} />
            <stop offset='75%' stopColor='#2451b7' stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey='value' stroke='#2451b7' fill='url(#color)' />
        <Area dataKey='value2' stroke='#a451b7' fill='url(#color)' />

        <XAxis 
          dataKey='date' 
          axisLine={false} 
          tickLine={false}
          tickFormatter={str => {
            // string to date object
            const date = parseISO(str);
            // check if divisible by 7
            if(date.getDate() % 7 === 0) {
              return format(date, 'MMM, d');
            }
            return '';
          }}
        />

        <YAxis 
          dataKey='value' 
          axisLine={false} 
          tickLine={false} 
          tickCount={8}
          tickFormatter={number => `$${number.toFixed(2)}`}
        />

        <Tooltip content={ <CustomTooltip /> } />

        <CartesianGrid opacity={0.1} vertical={false} />

      </AreaChart>

    </ResponsiveContainer>
  )
}

function CustomTooltip({ active, payload, label }) {
  if(active) {
    return (
      <div className='tooltip'>
        <h4>{format(parseISO(label), 'eeee, d MMM, yyyy')}</h4>
        <p>${payload[0].value.toFixed(2)} USD</p>
        <p>${payload[1].value.toFixed(2)} CAD</p>
      </div>
    )
  }

  return null;
}