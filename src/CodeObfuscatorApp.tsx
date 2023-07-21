import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { Button, Container, TextField, Typography, Box, Paper } from '@mui/material';
import { obfuscate, deobfuscate} from './CodeObfuscator'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';


const CodeObfuscatorApp: React.FC = () => {
  const [names, setNames] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [obfuscatedCode, setObfuscatedCode] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [deobfuscatedCode, setDeobfuscatedCode] = useState<string>('');

  const handleObfuscate = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const obfuscated = obfuscate(code, names.split(',').map(name => name.trim()));
    setObfuscatedCode(obfuscated);
  };

  const handleDeobfuscate = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const deobfuscated = deobfuscate(answer);
    setDeobfuscatedCode(deobfuscated);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Code Obfuscator</Typography>

      <TextField 
        label="Sensitive Names (comma separated)" 
        value={names} 
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNames(e.target.value)}
        multiline 
        fullWidth
        variant="outlined"
      />

      <Box mt={2}>
        <TextField 
          label="Code" 
          value={code} 
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)} 
          multiline 
          fullWidth
          variant="outlined"
        />
      </Box>

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleObfuscate}>Obfuscate</Button>
        <Paper elevation={2} style={{ padding: 10, marginTop: 10 }}>
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {obfuscatedCode}
          </SyntaxHighlighter>
        </Paper>
      </Box>

      <Box mt={2}>
        <TextField 
          label="Answer to deobfuscate" 
          value={answer} 
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)} 
          multiline 
          fullWidth
          variant="outlined"
        />
      </Box>

      <Box mt={2}>
        <Button variant="contained" color="secondary" onClick={handleDeobfuscate}>Deobfuscate</Button>
        <Paper elevation={2} style={{ padding: 10, marginTop: 10 }}>
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {deobfuscatedCode}
          </SyntaxHighlighter>
        </Paper>
      </Box>
    </Container>
  );
};

export default CodeObfuscatorApp;
