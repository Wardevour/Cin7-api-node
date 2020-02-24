# Cin7 API Client for NodeJS

A simple NodeJS package to make calls to the
  [Cin7 API](https://api.cin7.com/API/Help)

### Prerequisites

You will need to install [NodeJS](https://nodejs.org), which will come with
  npm. You must also sign up with Cin7 to get an CIN7_API_KEY. Your CIN7_API_KEY is the
  username and password separated by a colon. You will also need git installed.

```
UserName:Password
```

### Installing

First install [NodeJS](https://nodejs.org/en/download/) for your platform and
  make sure to add it to the PATH. The installer should offer to do this for
  you. The same goes for [git](https://git-scm.com/downloads).

Then, clone this repository with git. The following examples use a bash
  terminal in Ubuntu/Linux. However, it should be very similar across platforms
  and command line interfaces.

```bash
git clone git@github.com:Wardevour/Cin7-api-node.git
```

Next, you'll want to install the required dependencies. Run the `npm install`
  command from within the repository, like so:

```bash
cd Cin7-api-node
npm install
```

To run the tests you'll need to set the CIN7_API_KEY with dotenv. To do this,
   you must make a `.env` file and define your CIN7_API_KEY inside. Here
  is an example in bash:

```bash
touch .env
echo "CIN7_API_KEY=UserName:Password" >> .env
npm test
```

*NOTE:* You should never set the CIN7_API_KEY like this in production. Your key
  could be logged from the terminal. Also, environment variables should be
  set with the system, not with dotenv. When deploying to production, you can
  disable dotenv by setting the environment variable NODE_ENV="production"

## Authors

* **Kenneth Brockert** - *Initial work* -
  [Wardevour](https://github.com/Wardevour)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)
  file for details

## Acknowledgments

* NodeJS
* node-fetch
* dotenv
* mocha
* chai
