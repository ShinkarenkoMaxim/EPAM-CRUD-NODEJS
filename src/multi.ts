import cluster from 'cluster';
import { cpus } from 'os';

if (cluster.isPrimary) {
  const numOfCpus = cpus().length;

  console.log(`Starting server on ${numOfCpus} cores`);

  for (let i = 0; i < numOfCpus; i++) {
    cluster.fork();
  }
} else {
  const id = cluster.worker?.id;

  await import('./index.js');

  console.log(`Worker: ${id}, pid: ${process.pid}`);
}
