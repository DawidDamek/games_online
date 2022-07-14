import { helper } from '@ember/component/helper';
import { format } from 'date-fns';

function formatDate([date, formatOfDate]) {
  return format(date, formatOfDate);
}

export default helper(formatDate);
