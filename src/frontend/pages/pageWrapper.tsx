import { useAppSelector } from '@redux/hooks';
import { HomePage } from './home/home';
import { ProjectPage } from './project/project';
import { dirDataSelectors } from '@redux/dirDataSlice';

export const PageWrapper = () => {
  const directoryPath = useAppSelector(dirDataSelectors.selectDirectoryPath);
  return directoryPath ? <ProjectPage/> : <HomePage/>;
}
