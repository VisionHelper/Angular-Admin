export class AppConstants {
    public static job = "http://13.235.41.245:9001/";
    public static employer = "http://13.235.41.245:9002/employer";
    public static cat = "http://13.235.41.245:9003/";
    public static category = AppConstants.cat +'category';
    public static subCategory = AppConstants.cat +'subcategory';
    public static addJobseekerByAdmin = AppConstants.job +'jobseeker/admin';
    public static Jobseeker = AppConstants.job +'jobseeker/admin';
    public static cities = AppConstants.job +'jobseeker/cities';
    public static skills = 'http://13.235.41.245:9001/jobseeker/skills';
    public static commonSkills = 'http://13.235.41.245:9001/jobseeker/skills/common';
    public static getJobSeekerSkills = 'http://13.235.41.245:9001/jobseeker/skills';
    public static JobSeekers = 'http://13.235.41.245:9001/jobseeker';
    
    public static addEmployerProfileByAdmin = "http://13.235.41.245:9002/employer/admin";
    public static subscriptionplan = "http://13.235.41.245:9003/subscriptionplan";
    public static changeSubscriptionPlanStatus = "http://13.235.41.245:9003/subscriptionplan/changestatus/";
    
}