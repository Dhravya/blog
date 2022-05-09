import React, {useLayoutEffect} from 'react'

function KofiWidget() {
  const innerstuff = `
  <script>
  kofiWidgetOverlay.draw('dhravya', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support me',
    'floating-chat.donateButton.background-color': '#00b9fe',
    'floating-chat.donateButton.text-color': '#fff'
  });
</script>`

  return <div dangerouslySetInnerHTML={{__html:innerstuff}}></div>
}

export default KofiWidget