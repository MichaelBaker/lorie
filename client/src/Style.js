export const DarkGrey   = '#343434'
export const MediumGrey = '#999999'
export const LightGrey  = '#aaaaaa'
export const Red        = '#d6564d'
export const Green      = '#80c466'

export const ItemPadding = '5px'

export const Column = {
  display:       'flex',
  flexDirection: 'column',
  flex:          '1 1',
  padding:       '0 20px',
}

export const InputSection = {
  display:        'flex',
  flexDirection:  'row',
  justifyContent: 'space-between',
  marginBottom:   '20px',
  padding:        ItemPadding,
}

export const InputText = {
  flex:         '1 1 60%',
  border:       'none',
  borderBottom: '1px solid',
  borderColor:  MediumGrey,
}

export const InputButton = {
  border:     'none',
  background: 'none',
  flex:       '1 1',
  fontSize:   18,
}

export const dragDropStyle = (isOver, isDragging) => {
  if(isOver) {
    return {
      border:      '1px solid',
      borderColor: MediumGrey,
      padding:     ItemPadding,
    }
  } else if(isDragging) {
    return {
      color:   LightGrey,
      border:  '1px solid transparent',
      padding: ItemPadding,
    }
  } else {
    return {
      border:  '1px solid transparent',
      padding: ItemPadding,
    }
  }
}
