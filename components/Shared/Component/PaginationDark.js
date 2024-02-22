import DarkButton from '@/components/Interface/Buttons/DarkButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'

export default function PaginationDark(props) {
  const metaData = props.metaData
  const links = props.links

  const setPaginationLabel = (item, index) => {
    if (item.label === '&laquo; Previous') {
      return (
        <DarkButton
          outline
          size="sm"
          className="mr-1 !rounded-none"
          disabled={!metaData.prevPage}
          onClick={() => props.setPage(metaData.currentPage - 1)}
          key={index}
        >
          <i className={`fas fa-angle-left my-auto mx-1 fa-xl`}></i>
        </DarkButton>
      )
    }

    if (item.label === 'Next &raquo;') {
      return (
        <DarkButton
          outline
          size="sm"
          className="mr-1 !rounded-none"
          disabled={!metaData.nextPage}
          onClick={() => props.setPage(metaData.currentPage + 1)}
          key={index}
        >
          <i className={`fas fa-angle-right my-auto mx-1 fa-xl`}></i>
        </DarkButton>
      )
    }

    return (
      <DarkButton
        outline={!item.active}
        size="sm"
        className="mr-1 !rounded-none"
        onClick={() => props.setPage(item.label)}
        key={index}
      >
        {item.label}
      </DarkButton>
    )
  }

  return (
    <div className="flex mt-10 mx-auto justify-center">
      {links.map((item, index) => {
        return setPaginationLabel(item, index)
      })}
    </div>
  )
}
