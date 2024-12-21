/**
 * @description       :
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 12-21-2024
 * @last modified by  : Abhinav Singh
 **/
// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

List<Account> accList = TabAccountController.getAccountListByCountry(
  'United States'
);
System.debug(accList);

DogPictureCallout.getDogPicture();
TMDBApi.getPopularMovies();
TMDBApi.getMovieDetails('238');
TMDBApi.getTrendingMovies();
TMDBApi.searchMovies('');

System.debug(TMDBApi.getTrendingMovies('day'));

List<Id> caseIds = new List<Id>();
for (Case c : [
  SELECT Id
  FROM Case
  WHERE CaseNumber IN ('00001068', '00001067')
]) {
  caseIds.add(c.Id);
}
System.debug(CaseFilesController.getFiles(caseIds));
