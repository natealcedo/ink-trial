import React, { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import chalk from 'chalk';

function SearchQuery() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    console.log(query)
  }, [query])

  function handleKeyPress(_letter, key) {
    console.log(key);
    if (key && key.name == "return") {
      console.log("ENTER: EXITING NOW");
      process.exit(0);
    }
  }

  useEffect(() => {
    process.stdin.addListener("keypress", handleKeyPress);
    return () => {
      process.stdin.removeListener("keypress", handleKeyPress)
    }
  }, [query]);

  function handleChange(input) {
    setQuery(input)
  }
  return (
    <Box>
      <Box marginRight={1}>
        Enter your query:
				</Box>

      <TextInput
        value={query}
        onChange={handleChange}
      />
    </Box>
  )
}

const Status = ({ children, color }) => (
  <Text>{chalk.inverse[color](` ${children} `)}</Text>
)

Status.defaultProps = {
  color: "white"
}

const Demo = () => {
  const [state, setState] = useState(0);
  useEffect(() => {
    if (state !== 1000) {
      const interval = setInterval(() => {
        setState(l => l + 10);
      }, 10)
      return () => {
        clearInterval(interval)
      }
    }
  }, [state]);
  return (
    <>
      <Box>
        <Status>{"Hello " + state}</Status>
      </Box>
    </>
  );
}

render(<Demo />);