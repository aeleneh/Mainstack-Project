import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import transactionsData from '../data 2/transactionsData.json'

const RevenueChart = ({ filteredData }) => {

  // Use filteredData if passed, otherwise use all data
  const sourceData = filteredData && filteredData.length > 0 ? filteredData : transactionsData

  const data = sourceData
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      value: item.amount,
      rawDate: new Date(item.date),
    }))
    .sort((a, b) => a.rawDate - b.rawDate)

  const firstDate = data[0]?.date
  const lastDate = data[data.length - 1]?.date

  return (
    <div className="w-full h-[257px] bg-white rounded-xl p-4 font-degulardisplay mt-8">
      <div className='flex flex-col h-full'>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>

            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF5403" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#FF5403" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              height={35}
              axisLine={{ stroke: '#DBDEE5', strokeWidth: 1 }}
              tickLine={false}
              ticks={[firstDate, lastDate]}
              interval="preserveStartEnd"
              tick={(props) => {
                const { x, y, payload } = props
                const isFirst = payload.value === firstDate
                return (
                  <g>
                    <circle cx={x} cy={y - 8} r={3} fill="#DBDEE5" />
                    <text
                      x={x}
                      y={y + 20}
                      textAnchor={isFirst ? 'start' : 'end'}
                      fontSize={12}
                      fill="#56616B"
                      className='font-degulardisplay font-normal'
                    >
                      {payload.value}
                    </text>
                  </g>
                )
              }}
            />

            <YAxis hide />

            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
                boxShadow: '0px 4px 8px rgba(92, 115, 131, 0.08)'
              }}
              formatter={(value) => [`USD ${value.toLocaleString()}`, 'Amount']}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#FF5403"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              dot={false}
              activeDot={{ r: 6, fill: '#FF5403', stroke: '#fff', strokeWidth: 2 }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart