import { NestedLayoutType } from 'layouts/types'
export const NestedLayout: NestedLayoutType = ({
  left: Left,
  right: Right,
  children,
  withoutMainSide = false,
  withoutBalanceCard = false
}) => {
  // const [left,childrens,right] = children;
  return (
    <div className='flex justify-between gap-6 w-[95%] '>
      {!withoutMainSide &&
        <div className='sticky top-20 -ml-5 mr-1 '><Left /></div>
      }
      <div className='flex-1 '>{children}</div>

      {!withoutBalanceCard &&
        <div className='mt-7 lg:sticky top-20 max-lg:w-full max-lg:-ml-12 '><Right /></div>
      }
    </div>
  )
}

export default NestedLayout
