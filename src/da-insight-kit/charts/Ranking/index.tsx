import { tr } from "date-fns/locale"

export const Ranking=({data})=>{  
  return <div className="border border-gray-200 rounded-md w-96">
    <div className="flex flex-row justify-between p-2 text-sm"><p>Country</p><p>of total</p></div>
    <div className="flex flex-col p-2 text-xs gap-y-2">
        {data?.map((d)=><div className="flex p-2 flex-row justify-between border-b border-gray-200 gap-x-2">
            <p className="w-12">
        {d.segment}
        </p>
        <div className="flex grow">
        <p className="rounded-sm" style={{width:d.percentage+200,backgroundColor:"blue"}}></p>
            </div>
        <p>
        {d.value}
        </p>
      </div>)}</div>
  </div>
}