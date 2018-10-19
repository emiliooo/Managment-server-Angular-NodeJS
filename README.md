# Task

In Acaisoft we love working with cloud technologies.
In this task you will have to create simple UI components
that will allow a user to remotely manage many servers
located all around the world.

## API

To remotely administer the servers we have a REST API located in `./src` directory.
The API provides an interface listed in a table below:

| Method | Endpoint | Response | Description |
|---|---|---|---|
| GET | /servers | Array\<[Server](#types)\> | Returns a list of all servers. |
| GET | /servers/:serverId | [Server](#types) | Returns a server. |
| PUT | /servers/:serverId/on | [Server](#types) | Turns on a server |
| PUT | /servers/:serverId/off | [Server](#types) | Turns off a server |
| PUT | /servers/:serverId/reboot | [Server](#types) | Reboots a server |

#### Types
```typescript
interface Server {
    id: number;
    name: string;
    status: 'ONLINE' | 'OFFLINE' | 'REBOOTING';
}
```

### Requirements

Our API was created using Node.js v10.6.0. Other versions may or may not work correctly.

### Installation

In `./src` run:

```shell
npm install
```

### Run

In `./src` run:

```shell
npm start
```