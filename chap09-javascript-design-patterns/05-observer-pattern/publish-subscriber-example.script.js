/* globals PubSub */
/**
 * Example: User interface Notifications
 */

const gridContainer = document.getElementById('grid')
const lastUpdateContainer = document.getElementById('lastUpdate')
const publishForm = document.getElementById('publishForm')

// Helper Functions
// ==================================================
/**
 * Returns the current local time to be used in our UI later
 */
function getCurrentTime () {
  const date = new Date()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const y = date.getFullYear()
  const t = date.toLocaleTimeString().toLowerCase()

  return (m + '/' + d + '/' + y + ' ' + t)
}

/**
 * add a new row of data to the grid component
 */
function addGridRow (data) {
  console.log('updating grid', data)
  const row = document.createElement('div')
  const { summary, identifier, stockPrice } = data
  const text = document.createTextNode(`${summary} | ${identifier} | ${stockPrice}`)
  row.appendChild(text)
  gridContainer.appendChild(row)
}

// update grid to show the time of last change
function updateCounter (data) {
  const time = getCurrentTime()
  lastUpdateContainer.innerHTML = 'Last updated at: ' + time + ' with data: ' + JSON.stringify(data)
}

// update the grid using the data passed to our subscribers
function gridUpdate (topic, data) {
  if (data !== undefined) {
    addGridRow(data)
    updateCounter(data)
  }
}

// Publish/Subscriber implementation
// ==================================================
// create a subscription to the newDataAvailable topic
const subscriber = PubSub.subscribe('newDataAvailable', gridUpdate)

// the following represents updates to our data layer. This could be
// powered by ajax requests which broadcast that new data is available
// to the rest of the application.

// publish changes to the gridUpdated topic representing new entries
PubSub.publish('newDataAvailable', {
  summary: 'Apple made $5 billion',
  identifier: 'APPL',
  stockPrice: 570.91
})

PubSub.publish('newDataAvailable', {
  summary: 'Microsoft made $20 million',
  identifier: 'MSFT',
  stockPrice: 30.85
})

console.log('subscriber->', subscriber)

// Form Submit
publishForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const { srcElement } = e
  const summary = srcElement[0].value
  const identifier = srcElement[1].value
  const stockPrice = srcElement[2].value
  PubSub.publish('newDataAvailable', {
    summary, identifier, stockPrice
  })
})
