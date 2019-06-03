export default {
  applicationReceived: jest.fn(() => Promise.resolve({})),
  applicationRejected: jest.fn(() => Promise.resolve({})),
  applicationAccepted: jest.fn(() => Promise.resolve({}))
}
