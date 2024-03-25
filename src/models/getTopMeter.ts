export interface getTopMeter {
    movie: {
      imdb_id: string; 
      title: string; 
    };
    series: string;
    actor: {
      imdb_id: string;
      name: string; 
    }[];
    event_name: string; 
    year: number; 
    type: string; 
    award_name: string;
    award: string;
  }
  