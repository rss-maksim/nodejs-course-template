### Task 1. Caesar cipher CLI tool

Run:
```node caesar-cipher-cli -i './input.txt' -o './output.txt' -s 7 -a encode```

Run without input: ```node caesar-cipher-cli -o './output.txt' -s 1 -a encode```

Run without output: ```node caesar-cipher-cli -i './input.txt' -s 1 -a encode```

Run without input and output: ```node caesar-cipher-cli -s 1 -a encode```

CLI tool should accept 4 options (short alias and full name):

- -s, --shift: a shift
- -i, --input: an input file
- -o, --output: an output file
- -a, --action: an action encode/decode