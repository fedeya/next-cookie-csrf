import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';

interface Task {
  id: string;
  content: string;
  completed: boolean;
}

type HomeProps = {
  tasks: Task[];
};

const Home: React.FC<HomeProps> = ({ tasks: data }) => {
  const [content, setContent] = useState('');
  const [tasks, setTasks] = useState(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:4000/api/task',
        {
          content
        },
        {
          withCredentials: true
        }
      );

      setTasks([...tasks, res.data.task]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" defaultChecked={task.completed} />
            {task.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies.token) {
    return {
      props: {},
      redirect: {
        destination: '/login'
      }
    };
  }

  const res = await axios.get('http://localhost:4000/api/task', {
    headers: req.headers
  });

  return {
    props: {
      tasks: res.data.tasks
    }
  };
};

export default Home;
