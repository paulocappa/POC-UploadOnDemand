import formatBytes from '@shared/utils/formatBytes';

type Chunks = AsyncIterable<Buffer>;

interface IRequest {
  filename: string;
}

export default function handleOnData({ filename }: IRequest) {
  return async function* chunkData(chunks: Chunks): AsyncGenerator {
    let processedAlready = 0;

    for await (const chunk of chunks) {
      yield chunk;

      processedAlready += chunk.length;

      // console.log(`File [${filename}] got ${formatBytes(processedAlready)}`);
    }
  };
}
