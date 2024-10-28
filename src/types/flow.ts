export interface Node {
  id: string;
  type: string;
  label: string;
  category: 'START' | 'RESPOND' | 'OPERATIONS' | 'EXTENSIONS';
  config: {
    utterances?: string[];
    text?: string;
    buttons?: string[];
    condition?: string;
    [key: string]: any;
  };
  connection_label?: string;
}

export interface Flow {
  name: string;
  nodes: Node[];
  connections: Array<{
    from: string;
    to: string;
    label?: string;
  }>;
}