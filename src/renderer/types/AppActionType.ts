
export enum AppActionType {
  CREATE_TRADE = 'CREATE_TRADE',
  READ_TRADE = 'READ_TRADE',
  ACK_MESSAGE = 'ACK_MESSAGE',
  ACK_MESSAGE_READ = 'ACK_MESSAGE_READ',
  READ_MESSAGE = 'READ_MESSAGE',
  ADD_MY_MESSAGE = 'ADD_MY_MESSAGE',
  ADD_OTHERS_MESSAGE = 'ADD_OTHERS_MESSAGE',
  INIT = 'INIT', // meta-type to trigger background processes' initiation
}
